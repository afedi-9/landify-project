import { ethers } from "ethers"
import { toast } from "../components/ui/use-toast"

// Sonic blockchain configuration
const SONIC_RPC_URL = process.env.REACT_APP_SONIC_RPC_URL || "https://sonic-rpc.example.com"
const SONIC_CHAIN_ID = Number.parseInt(process.env.REACT_APP_SONIC_CHAIN_ID || "1001")
const SONIC_EXPLORER_URL = process.env.REACT_APP_SONIC_EXPLORER_URL || "https://explorer.sonic.network"

// Property NFT contract ABI (simplified version)
const PROPERTY_NFT_ABI = [
  "function mint(string memory tokenURI) public returns (uint256)",
  "function transferFrom(address from, address to, uint256 tokenId) public",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
]

export class SonicClient {
  provider: ethers.providers.Web3Provider | null = null
  signer: ethers.Signer | null = null
  nftContract: ethers.Contract | null = null
  address: string | null = null
  chainId: number | null = null
  isConnected = false
  contractAddress?: string

  constructor(contractAddress?: string) {
    this.contractAddress = contractAddress
  }

  /**
   * Connect to the user's wallet
   */
  async connect(): Promise<string | null> {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        toast({
          title: "Wallet not found",
          description: "Please install MetaMask or another Ethereum wallet",
          variant: "destructive",
        })
        return null
      }

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" })

      // Create provider and signer
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
      this.signer = this.provider.getSigner()
      this.address = await this.signer.getAddress()

      // Check if we're on the correct network
      const network = await this.provider.getNetwork()
      this.chainId = network.chainId

      if (this.chainId !== SONIC_CHAIN_ID) {
        try {
          // Try to switch to Sonic network
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.utils.hexValue(SONIC_CHAIN_ID) }],
          })
        } catch (switchError: any) {
          // If the network doesn't exist in the wallet, add it
          if (switchError.code === 4902) {
            await this.addSonicNetwork()
          } else {
            throw switchError
          }
        }
      }

      // Initialize contract if address is provided
      if (this.contractAddress) {
        this.nftContract = new ethers.Contract(this.contractAddress, PROPERTY_NFT_ABI, this.signer)
      }

      this.isConnected = true

      // Listen for account changes
      window.ethereum.on("accountsChanged", this.handleAccountsChanged.bind(this))

      return this.address
    } catch (error) {
      console.error("Connection error:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect to wallet",
        variant: "destructive",
      })
      return null
    }
  }

  /**
   * Add Sonic network to MetaMask
   */
  private async addSonicNetwork() {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: ethers.utils.hexValue(SONIC_CHAIN_ID),
          chainName: "Sonic Network",
          nativeCurrency: {
            name: "SONIC",
            symbol: "SONIC",
            decimals: 18,
          },
          rpcUrls: [SONIC_RPC_URL],
          blockExplorerUrls: [SONIC_EXPLORER_URL],
        },
      ],
    })
  }

  /**
   * Handle account changes in the wallet
   */
  private handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      // User disconnected their wallet
      this.disconnect()
    } else {
      // User switched accounts
      this.address = accounts[0]
    }
  }

  /**
   * Disconnect from the wallet
   */
  disconnect() {
    this.provider = null
    this.signer = null
    this.nftContract = null
    this.address = null
    this.isConnected = false

    // Remove event listeners
    if (window.ethereum) {
      window.ethereum.removeListener("accountsChanged", this.handleAccountsChanged)
    }
  }

  /**
   * Deploy a new property NFT contract
   */
  async deployPropertyContract(name: string, symbol: string): Promise<string | null> {
    try {
      if (!this.signer) {
        throw new Error("Wallet not connected")
      }

      const contractFactory = new ethers.ContractFactory(
        ["constructor(string memory name_, string memory symbol_)", ...PROPERTY_NFT_ABI],
        "0x...", // Contract bytecode would go here
        this.signer,
      )

      const contract = await contractFactory.deploy(name, symbol)
      await contract.deployed()

      this.contractAddress = contract.address
      this.nftContract = contract

      return contract.address
    } catch (error) {
      console.error("Deployment error:", error)
      toast({
        title: "Deployment failed",
        description: "Failed to deploy property contract",
        variant: "destructive",
      })
      return null
    }
  }

  /**
   * Mint a new property NFT
   */
  async mintPropertyNFT(propertyMetadataURI: string): Promise<{ tokenId: string; txHash: string } | null> {
    try {
      if (!this.nftContract || !this.signer) {
        throw new Error("Contract not initialized or wallet not connected")
      }

      const tx = await this.nftContract.mint(propertyMetadataURI)
      const receipt = await tx.wait()

      // Find the Transfer event to get the token ID
      const transferEvent = receipt.events?.find((e) => e.event === "Transfer")
      const tokenId = transferEvent?.args?.tokenId.toString()

      return {
        tokenId,
        txHash: receipt.transactionHash,
      }
    } catch (error) {
      console.error("Minting error:", error)
      toast({
        title: "Minting failed",
        description: "Failed to mint property NFT",
        variant: "destructive",
      })
      return null
    }
  }

  /**
   * Transfer property ownership
   */
  async transferProperty(tokenId: string, toAddress: string): Promise<string | null> {
    try {
      if (!this.nftContract || !this.signer || !this.address) {
        throw new Error("Contract not initialized or wallet not connected")
      }

      const tx = await this.nftContract.transferFrom(this.address, toAddress, tokenId)
      const receipt = await tx.wait()

      return receipt.transactionHash
    } catch (error) {
      console.error("Transfer error:", error)
      toast({
        title: "Transfer failed",
        description: "Failed to transfer property ownership",
        variant: "destructive",
      })
      return null
    }
  }

  /**
   * Sign a message to verify ownership
   */
  async signMessage(message: string): Promise<string | null> {
    try {
      if (!this.signer) {
        throw new Error("Wallet not connected")
      }

      return await this.signer.signMessage(message)
    } catch (error) {
      console.error("Signing error:", error)
      toast({
        title: "Signing failed",
        description: "Failed to sign message",
        variant: "destructive",
      })
      return null
    }
  }

  /**
   * Get transaction URL for explorer
   */
  getTransactionUrl(txHash: string): string {
    return `${SONIC_EXPLORER_URL}/tx/${txHash}`
  }
}

// Create a singleton instance
let sonicClientInstance: SonicClient | null = null

export function getSonicClient(contractAddress?: string): SonicClient {
  if (!sonicClientInstance) {
    sonicClientInstance = new SonicClient(contractAddress)
  } else if (contractAddress && contractAddress !== sonicClientInstance.contractAddress) {
    sonicClientInstance.contractAddress = contractAddress
  }
  return sonicClientInstance
}

// Add type definitions for window.ethereum
declare global {
  interface Window {
    ethereum: any
  }
}
