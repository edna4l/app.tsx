import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface IdentityStepProps {
  profile: any;
  onUpdate: (updates: any) => void;
}

const IdentityStep: React.FC<IdentityStepProps> = ({ profile, onUpdate }) => {
  const genderOptions = ['Woman', 'Man', 'Non-binary', 'Genderfluid', 'Transgender', 'Questioning'];
  const orientationOptions = ['Lesbian', 'Gay', 'Bisexual', 'Pansexual', 'Queer', 'Questioning', 'Asexual'];
  const prideFlags = [
    { name: 'LGBTQ+', color: 'bg-gradient-to-r from-red-400 to-purple-400' },
    { name: 'Trans', color: 'bg-gradient-to-r from-blue-300 to-pink-300' },
    { name: 'Bisexual', color: 'bg-gradient-to-r from-pink-400 to-purple-600' },
    { name: 'Lesbian', color: 'bg-gradient-to-r from-orange-400 to-pink-500' },
    { name: 'Non-binary', color: 'bg-gradient-to-r from-yellow-300 to-purple-400' },
    { name: 'Pansexual', color: 'bg-gradient-to-r from-pink-400 to-yellow-300' },
    { name: 'Asexual', color: 'bg-gradient-to-r from-gray-700 to-purple-400' },
    { name: 'Genderfluid', color: 'bg-gradient-to-r from-pink-300 to-blue-300' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Identity & Expression</h2>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Gender Identity *</label>
        <div className="grid grid-cols-2 gap-2">
          {genderOptions.map((option) => (
            <Button
              key={option}
              variant={profile.genderIdentity === option ? "default" : "outline"}
              className="justify-start"
              onClick={() => onUpdate({ genderIdentity: option })}
            >
              {option}
            </Button>
          ))}
        </div>
        <Button variant="ghost" className="mt-2 text-sm">
          <Plus className="w-4 h-4 mr-1" />
          Add custom identity
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Sexual Orientation *</label>
        <div className="grid grid-cols-2 gap-2">
          {orientationOptions.map((option) => (
            <Button
              key={option}
              variant={profile.sexualOrientation === option ? "default" : "outline"}
              className="justify-start"
              onClick={() => onUpdate({ sexualOrientation: option })}
            >
              {option}
            </Button>
          ))}
        </div>
        <Button variant="ghost" className="mt-2 text-sm">
          <Plus className="w-4 h-4 mr-1" />
          Add custom identity
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Pronouns (Optional)</label>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="show-pronouns"
            checked={profile.showPronouns}
            onCheckedChange={(checked) => onUpdate({ showPronouns: checked })}
          />
          <label htmlFor="show-pronouns" className="text-sm">Show pronouns on my profile</label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Pride Pins & Community Labels</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select pins that represent your identity, community, and what you're looking for. These help you connect with like-minded people!
        </p>
        <div className="grid grid-cols-2 gap-2">
          {prideFlags.map((flag) => (
            <Button
              key={flag.name}
              variant="outline"
              className="justify-start"
            >
              <div className={`w-4 h-4 rounded mr-2 ${flag.color}`}></div>
              {flag.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { IdentityStep };
export default IdentityStep;