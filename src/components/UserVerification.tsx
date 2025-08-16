import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Camera, Shield, CheckCircle, Clock, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const UserVerification: React.FC = () => {
  const [photoStatus, setPhotoStatus] = useState('pending');
  const [idStatus, setIdStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = async () => {
    setLoading(true);
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async () => {
            const { data, error } = await supabase.functions.invoke('submit-verification', {
              body: {
                verificationType: 'photo',
                fileData: reader.result,
                fileName: file.name
              }
            });
            if (!error) setPhotoStatus('approved');
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } catch (error) {
      console.error('Photo upload failed:', error);
    }
    setLoading(false);
  };

  const handleIdUpload = async () => {
    setLoading(true);
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,.pdf';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async () => {
            const { data, error } = await supabase.functions.invoke('submit-verification', {
              body: {
                verificationType: 'id',
                fileData: reader.result,
                fileName: file.name
              }
            });
            if (!error) setIdStatus('approved');
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } catch (error) {
      console.error('ID upload failed:', error);
    }
    setLoading(false);
  };

  const verificationSteps = [
    { id: 'photo', title: 'Photo Verification', completed: photoStatus === 'approved' },
    { id: 'id', title: 'ID Verification', completed: idStatus === 'approved' },
    { id: 'review', title: 'Under Review', completed: photoStatus === 'approved' && idStatus === 'approved' }
  ];

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto">
      <Card className="border-2 border-purple-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl text-purple-800">🌈💜 Get Verified 💜🌈</CardTitle>
          <p className="text-sm text-gray-600">Build trust in the community</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationSteps.map((step) => (
            <div key={step.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {step.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Clock className="w-5 h-5 text-gray-400" />
                )}
                <span className={step.completed ? 'text-green-700' : 'text-gray-700'}>
                  {step.title}
                </span>
              </div>
              {step.completed && <Badge variant="secondary" className="bg-green-100 text-green-700">Complete</Badge>}
            </div>
          ))}
          
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handlePhotoUpload}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              disabled={photoStatus === 'approved' || loading}
            >
              <Camera className="w-4 h-4 mr-2" />
              {photoStatus === 'approved' ? 'Photo Verified ✓' : 'Take Verification Photo'}
            </Button>
            
            <Button 
              onClick={handleIdUpload}
              variant="outline"
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              disabled={idStatus === 'approved' || loading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {idStatus === 'approved' ? 'ID Verified ✓' : 'Upload ID Document'}
            </Button>
          </div>

          {photoStatus === 'approved' && idStatus === 'approved' && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-purple-700 font-medium">Verification Submitted!</p>
              <p className="text-sm text-purple-600 mt-1">Review typically takes 24-48 hours</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserVerification;