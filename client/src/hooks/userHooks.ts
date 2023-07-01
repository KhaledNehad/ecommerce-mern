import { useMutation } from '@tanstack/react-query';
import apiClient from '../apiClient';

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>('api/users/signin', {
          email,
          password,
        })
      ).data,
  });
