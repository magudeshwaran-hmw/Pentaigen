import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  CreditCard,
  Banknote,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: user?.phone || '+919876543210',
    address: '123 Main Street, Bangalore, Karnataka 560001',
    pan: 'ABCDE1234F',
    aadhaar: 'XXXX-XXXX-1234',
    dob: '1990-01-01'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  const formatPhone = (phone: string) => {
    return `+91 ${phone.slice(2, 7)} ${phone.slice(7)}`;
  };

  const formatAadhaar = (aadhaar: string) => {
    return `XXXX-XXXX-${aadhaar.slice(-4)}`;
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display italic text-penta-text1">Profile</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button 
                onClick={handleSave}
                className="bg-penta-teal hover:bg-penta-teal/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button 
                variant="outline"
                onClick={handleCancel}
                className="border-penta-rose text-penta-rose hover:bg-penta-rose hover:text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-penta-blue hover:bg-penta-blue/90"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-penta-blue to-penta-violet flex items-center justify-center mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-penta-teal hover:bg-penta-teal/90"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <h3 className="mt-4 text-lg font-medium text-penta-text1">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-sm text-penta-text2">{formData.email}</p>
              <div className="mt-4 space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-penta-text3" />
                  <span className="text-penta-text1">{formatPhone(formData.phone)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-penta-text3" />
                  <span className="text-penta-text1">{formData.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-penta-text3" />
                  <span className="text-penta-text1">{formData.dob}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-5 h-5 text-penta-blue" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-penta-blue" />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pan">PAN Card</Label>
              <Input
                id="pan"
                value={formData.pan}
                onChange={(e) => handleInputChange('pan', e.target.value)}
                disabled={!isEditing}
                className="mt-1 uppercase"
                maxLength={10}
              />
            </div>
            <div>
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                value={isEditing ? formData.aadhaar : formatAadhaar(formData.aadhaar)}
                onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
                maxLength={12}
              />
            </div>
          </CardContent>
        </Card>

        {/* Linked Accounts */}
        <Card className="border border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Banknote className="w-5 h-5 text-penta-blue" />
              Linked Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg border-penta-surface1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-penta-text1">HDFC Bank</p>
                    <p className="text-sm text-penta-text2">****1234</p>
                  </div>
                  <Shield className="w-4 h-4 text-penta-teal" />
                </div>
              </div>
              <div className="p-4 border rounded-lg border-penta-surface1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-penta-text1">Zerodha</p>
                    <p className="text-sm text-penta-text2">****5678</p>
                  </div>
                  <Shield className="w-4 h-4 text-penta-teal" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="border border-border lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-penta-blue" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg border-penta-surface1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-penta-text1">PAN Card</p>
                    <p className="text-sm text-penta-text2">Verified</p>
                  </div>
                  <Shield className="w-4 h-4 text-penta-teal" />
                </div>
              </div>
              <div className="p-4 border rounded-lg border-penta-surface1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-penta-text1">Aadhaar Card</p>
                    <p className="text-sm text-penta-text2">Verified</p>
                  </div>
                  <Shield className="w-4 h-4 text-penta-teal" />
                </div>
              </div>
              <div className="p-4 border rounded-lg border-penta-surface1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-penta-text1">Bank Statement</p>
                    <p className="text-sm text-penta-text2">Uploaded</p>
                  </div>
                  <Shield className="w-4 h-4 text-penta-amber" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
