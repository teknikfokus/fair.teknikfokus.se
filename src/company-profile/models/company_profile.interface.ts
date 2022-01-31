export interface CompanyProfile {
    id?: number;
    name?: string;
    slug_name?: string;
    information?: string;
    fair_day?: number;
    image_path?: string;
    meeting_link?: string;
    summer_internship?: boolean;
    master_thesis?: boolean;
    trainee_programme?: boolean;
}