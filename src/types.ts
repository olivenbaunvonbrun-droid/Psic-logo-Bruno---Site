export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  location?: string;
  role?: string;
  text: string;
  outcome: string; // The transformation achieved
}

export interface PainPoint {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  mainPain: string; // What they feel
  subconsciousMessage: string; // Secret raw pain
  approach: string; // 4th generation TCC humanized perspective
  advice: string; // Gentle self-help direction
}

export interface AssessmentQuestion {
  id: number;
  text: string;
  category: 'anxiety' | 'depression' | 'self_esteem' | 'dependence';
  options: {
    text: string;
    score: number;
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
