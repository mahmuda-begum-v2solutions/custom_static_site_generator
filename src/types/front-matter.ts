export interface FrontMatter {
  title?: string;
  date?: string;
  author?: string;
  layout?: string;
  description?: string;
  tags?: string[] | string;
}

export interface ResolvedFrontMatter {
  title: string;
  date: string;
  author: string;
  layout: string;
  description?: string;
  tags: string[];
  formattedDate: string;
  dateTime: string; // ✅ Add this line
}
