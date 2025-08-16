import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export const useProfile = (id?: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use provided id or current user's id
        const userId = id || user?.id;
        
        if (!userId) {
          setError('No user ID provided');
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            // No profile found
            setProfile(null);
          } else {
            throw fetchError;
          }
        } else {
          // Transform database fields to match component expectations
          setProfile({
            user_id: data.id,
            name: data.full_name,
            age: data.birthdate ? new Date().getFullYear() - new Date(data.birthdate).getFullYear() : null,
            location: data.location,
            bio: data.bio,
            occupation: data.occupation,
            lgbtq_status: data.sexual_orientation,
            genderIdentity: data.gender_identity,
            sexualOrientation: data.sexual_orientation,
            interests: data.interests || [],
            photos: data.photos || [],
            lifestyle: data.lifestyle_interests || {},
            privacy: data.privacy_settings || {},
            safety: data.safety_settings || {},
            profileCompleted: data.profile_completed || false,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (user || id) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [id, user]);

  const updateProfile = async (updates: any) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Refresh profile data
      setProfile(prev => ({ ...prev, ...updates }));
      return { error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { error: err instanceof Error ? err.message : 'Failed to update profile' };
    }
  };

  return { profile, loading, error, updateProfile };
};