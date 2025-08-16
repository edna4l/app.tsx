import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, Users, Lock } from 'lucide-react';

interface SafetyStepProps {
  profile: any;
  onUpdate: (updates: any) => void;
}

const SafetyStep: React.FC<SafetyStepProps> = ({ profile, onUpdate }) => {
  // Initialize safety settings when component loads
  React.useEffect(() => {
    if (!profile.safety || Object.keys(profile.safety).length === 0) {
      onUpdate({
        safety: {
          identityVerified: false,
          photoVerified: false,
          locationPrivacy: 'matches_only',
          maxDistance: 25,
          showExactLocation: false,
          communityGuidelinesAccepted: true
        }
      });
    }
  }, []);
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Safety Dashboard</h2>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Verification Complete</h3>
          </div>
          <p className="text-sm text-blue-700">Reports Filed</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold">Identity Verification</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Upload a selfie for identity confirmation</span>
              <span className="text-pink-600 font-medium">Required</span>
            </div>
            <div className="flex justify-between">
              <span>Video Verification for real-time identity confirmation</span>
              <span className="text-pink-600 font-medium">Required</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5" />
            <h3 className="font-semibold">Location Privacy</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Show Exact Location</span>
              <span className="text-gray-500">Off</span>
            </div>
            <div className="flex justify-between">
              <span>Maximum Search Distance</span>
              <span className="text-gray-500">25 Miles</span>
            </div>
            <div className="flex justify-between">
              <span>Location Visibility</span>
              <span className="text-gray-500">Matches Only</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5" />
            <h3 className="font-semibold">Privacy Protection</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Your location data is encrypted and never shared without your consent.
          </p>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold">Community Guidelines</h3>
          </div>
          <ul className="text-sm space-y-1">
            <li>• Respect all community members</li>
            <li>• No harassment or discrimination</li>
            <li>• Use authentic photos and information</li>
            <li>• Report inappropriate behavior</li>
            <li>• Protect your personal information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export { SafetyStep };
export default SafetyStep;