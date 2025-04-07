
export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  url: string;
  imageUrl?: string;
  countryId: string;
  tags: string[];
}
