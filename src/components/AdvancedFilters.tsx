import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdvancedFilters: React.FC = () => {
  const [ageRange, setAgeRange] = useState([22, 35]);
  const [distance, setDistance] = useState([25]);
  const [interests, setInterests] = useState<string[]>(['Art', 'Music']);
  const [pronouns, setPronouns] = useState<string[]>(['She/Her']);
  const [relationshipType, setRelationshipType] = useState<string[]>(['Serious']);

  const interestOptions = ['Art', 'Music', 'Travel', 'Books', 'Sports', 'Cooking', 'Gaming', 'Photography', 'Dancing', 'Hiking'];
  const pronounOptions = ['She/Her', 'They/Them', 'He/Him', 'Any'];
  const relationshipOptions = ['Casual', 'Serious', 'Friends', 'Networking'];

  const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <Card className="bg-black/90 backdrop-blur-sm text-white border-pink-200">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Age Range */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Age Range: {ageRange[0]} - {ageRange[1]}
            </label>
            <Slider
              value={ageRange}
              onValueChange={setAgeRange}
              max={65}
              min={18}
              step={1}
              className="w-full"
            />
          </div>

          {/* Distance */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Distance: {distance[0]} miles
            </label>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Interests</label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(interest => (
                <Badge
                  key={interest}
                  variant={interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    interests.includes(interest) 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' 
                      : 'hover:bg-white/10 text-white border-white/30'
                  }`}
                  onClick={() => toggleSelection(interest, interests, setInterests)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Pronouns */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Pronouns</label>
            <div className="flex flex-wrap gap-2">
              {pronounOptions.map(pronoun => (
                <Badge
                  key={pronoun}
                  variant={pronouns.includes(pronoun) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    pronouns.includes(pronoun) 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' 
                      : 'hover:bg-white/10 text-white border-white/30'
                  }`}
                  onClick={() => toggleSelection(pronoun, pronouns, setPronouns)}
                >
                  {pronoun}
                </Badge>
              ))}
            </div>
          </div>

          {/* Relationship Type */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Looking For</label>
            <div className="flex flex-wrap gap-2">
              {relationshipOptions.map(type => (
                <Badge
                  key={type}
                  variant={relationshipType.includes(type) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    relationshipType.includes(type) 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' 
                      : 'hover:bg-white/10 text-white border-white/30'
                  }`}
                  onClick={() => toggleSelection(type, relationshipType, setRelationshipType)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedFilters;