
export interface PromptConfig {
  idea: string;
  language: 'pt-BR' | 'en';
  media?: {
    data: string;
    mimeType: string;
  };
}

export interface GeneratedPrompt {
  content: string;
  title: string;
}

/**
 * Interface representing a user in the system.
 * Fixes: Module '"../types"' has no exported member 'User'.
 */
export interface User {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}
