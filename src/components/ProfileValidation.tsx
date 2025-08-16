import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ValidationProps {
  profile: any;
  currentStep: number;
}

const ProfileValidation: React.FC<ValidationProps> = ({ profile, currentStep }) => {
  const validations = [
    {
      step: 0,
      label: 'Basic Info',
      checks: [
        { field: 'name', label: 'Name', valid: !!profile.name },
        { field: 'age', label: 'Age', valid: !!profile.age && parseInt(profile.age) >= 18 },
        { field: 'bio', label: 'Bio', valid: !!profile.bio && profile.bio.length >= 20 }
      ]
    },
    {
      step: 1,
      label: 'Identity',
      checks: [
        { field: 'genderIdentity', label: 'Gender Identity', valid: !!profile.genderIdentity },
        { field: 'sexualOrientation', label: 'Sexual Orientation', valid: !!profile.sexualOrientation }
      ]
    },
    {
      step: 2,
      label: 'Lifestyle',
      checks: [
        { field: 'interests', label: 'Interests', valid: profile.interests && profile.interests.length >= 3 }
      ]
    },
    {
      step: 3,
      label: 'Photos',
      checks: [
        { field: 'photos', label: 'Profile Photos', valid: profile.photos && profile.photos.length >= 1 }
      ]
    }
  ];

  const currentValidation = validations[currentStep];
  if (!currentValidation) return null;

  const allValid = currentValidation.checks.every(check => check.valid);
  const someValid = currentValidation.checks.some(check => check.valid);

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        {allValid ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : someValid ? (
          <AlertCircle className="w-5 h-5 text-yellow-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
        <h3 className="font-medium">
          {currentValidation.label} Validation
        </h3>
      </div>
      
      <div className="space-y-2">
        {currentValidation.checks.map((check, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{check.label}</span>
            <Badge 
              variant={check.valid ? "default" : "destructive"}
              className="text-xs"
            >
              {check.valid ? 'Complete' : 'Required'}
            </Badge>
          </div>
        ))}
      </div>
      
      {!allValid && (
        <p className="text-xs text-gray-500 mt-2">
          Complete all required fields to continue to the next step.
        </p>
      )}
    </div>
  );
};

export default ProfileValidation;