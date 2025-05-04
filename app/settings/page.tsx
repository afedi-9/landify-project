"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/components/auth-provider"
import { Loader2, Shield, Wallet } from "lucide-react"
import { useState } from "react"

export default function Settings() {
  const { user, connectWallet } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState(user?.walletAddress || "")
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    try {
      const address = await connectWallet()
      setWalletAddress(address)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setSuccessMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccessMessage("Profile updated successfully")
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {successMessage && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-md text-sm">
                  {successMessage}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Country" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Connection</CardTitle>
              <CardDescription>Connect your blockchain wallet to Landify</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                      <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Blockchain Wallet</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {walletAddress ? "Connected" : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    variant={walletAddress ? "outline" : "default"}
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : walletAddress ? (
                      "Reconnect"
                    ) : (
                      "Connect Wallet"
                    )}
                  </Button>
                </div>
                {walletAddress && (
                  <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded border">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Wallet Address</p>
                    <p className="font-mono text-sm truncate">{walletAddress}</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Supported Wallets</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full mb-2"></div>
                    <p className="text-sm font-medium">MetaMask</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full mb-2"></div>
                    <p className="text-sm font-medium">WalletConnect</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full mb-2"></div>
                    <p className="text-sm font-medium">Coinbase</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full mb-2"></div>
                    <p className="text-sm font-medium">Sonic Wallet</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive notifications about your properties and transactions via email
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="property-updates">Property Updates</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Get notified when there are changes to your property status
                    </p>
                  </div>
                  <Switch id="property-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="transaction-alerts">Transaction Alerts</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive alerts for new transactions and ownership transfers
                    </p>
                  </div>
                  <Switch id="transaction-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing Communications</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <Switch id="marketing" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-slate-400 mt-1" />
                  <div>
                    <h3 className="font-medium">Account Protection</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Your account is protected with blockchain-based security. All property transactions require wallet
                      signature verification.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
