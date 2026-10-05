export interface Newpaper {
    id: string;                  // link to the page on loc.gov (also used as the React key)
    title: string;
    date: string;                // "YYYY-MM-DD"
    part_of_title?: string[];     // newspaper name
    location_state?: string[];
    location_city?: string[];
    description?: string[];      // OCR text shown in the text box
}