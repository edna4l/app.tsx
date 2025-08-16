import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';

const GENDER_IDENTITIES = [
  'Woman', 'Lesbian', 'Bisexual', 'Pansexual', 'Queer', 'Transgender Woman',
  'Non-binary', 'Genderfluid', 'Genderqueer', 'Demigirl', 'Two-Spirit',
  'Agender', 'Bigender', 'Pangender', 'Gender Non-conforming', 'Femme',
  'Butch', 'Stud', 'Soft Butch', 'Chapstick Lesbian', 'Lipstick Lesbian', 'Questioning'
];

interface GenderIdentitySelectorProps {
  selectedIdentities: string[];
  onSelectionChange: (identities: string[]) => void;
  maxSelections?: number;
}

export const GenderIdentitySelector: React.FC<GenderIdentitySelectorProps> = ({
  selectedIdentities,
  onSelectionChange,
  maxSelections = 3
}) => {
  const toggleIdentity = (identity: string) => {
    if (selectedIdentities.includes(identity)) {
      onSelectionChange(selectedIdentities.filter(i => i !== identity));
    } else if (selectedIdentities.length < maxSelections) {
      onSelectionChange([...selectedIdentities, identity]);
    }
  };

  return (
    <Card className="p-4 glass-card">
      <h3 className="text-lg font-semibold mb-4 text-white">Gender Identity</h3>
      <p className="text-sm text-gray-300 mb-4">Select up to {maxSelections} identities</p>
      <div className="flex flex-wrap gap-2">
        {GENDER_IDENTITIES.map((identity) => {
          const isSelected = selectedIdentities.includes(identity);
          return (
            <Badge
              key={identity}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent' 
                  : 'border-purple-300 text-purple-300 hover:border-pink-400 hover:text-pink-400'
              }`}
              onClick={() => toggleIdentity(identity)}
            >
              {identity}
            </Badge>
          );
        })}
      </div>
    </Card>
  );
};

export default GenderIdentitySelector;