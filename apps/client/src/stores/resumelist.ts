// Import necessary dependencies
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import dayjs from 'dayjs';
// Define the type for your state
interface MyState {
  items: { id: number; title: string;slug:string;visibility:string;locked:boolean;userId:string;createdAt:string;updatedAt:string; data: Record<string, unknown> }[];
  addItem: (item: { id: number; name: string }) => void;
}

// Create your Zustand store
export const useMyStore = create<any>(
  // Use the curried version of create<T> for TypeScript
  devtools(
    persist(
      (set) => ({
        items: [], // Initialize your array of objects
        updateItem: (itemId:any, updatedData:any) => {
            set((state:any) => ({
              items: state.items.map((item:any) =>
                item.id === itemId ? { ...item, data: updatedData } : item
              ),
            }));
          },
        addItem: (item:any) => {
          set((state:any) => ({
            items: [...state.items, { ...item, data: { "basics": {
                "name": "User",
                "headline": "",
                "email": "",
                "phone": "",
                "location": "",
                "url": {
                    "label": "",
                    "href": ""
                },
                "customFields": [],
                "picture": {
                    "url": "http://localhost:9000/default/clsx0bcbo0000u9nn6m63rmfc/pictures/clsx0bcbo0000u9nn6m63rmfc.jpg",
                    "size": 64,
                    "aspectRatio": 1,
                    "borderRadius": 0,
                    "effects": {
                        "hidden": false,
                        "border": false,
                        "grayscale": false
                    }
                }
            },
            "sections": {
                "summary": {
                    "name": "Summary",
                    "columns": 1,
                    "visible": true,
                    "id": "summary",
                    "content": ""
                },
                "awards": {
                    "name": "Awards",
                    "columns": 1,
                    "visible": true,
                    "id": "awards",
                    "items": []
                },
                "certifications": {
                    "name": "Certifications",
                    "columns": 1,
                    "visible": true,
                    "id": "certifications",
                    "items": []
                },
                "education": {
                    "name": "Education",
                    "columns": 1,
                    "visible": true,
                    "id": "education",
                    "items": [
                        {
                            "id": "w57bjanifggmfsozw5om3nul",
                            "visible": true,
                            "institution": "",
                            "studyType": "",
                            "area": "",
                            "score": "",
                            "date": "",
                            "summary": "",
                            "url": {
                                "label": "",
                                "href": ""
                            }
                        }
                    ]
                },
                "experience": {
                    "name": "Experience",
                    "columns": 1,
                    "visible": true,
                    "id": "experience",
                    "items": []
                },
                "volunteer": {
                    "name": "Volunteering",
                    "columns": 1,
                    "visible": true,
                    "id": "volunteer",
                    "items": []
                },
                "interests": {
                    "name": "Interests",
                    "columns": 1,
                    "visible": true,
                    "id": "interests",
                    "items": []
                },
                "languages": {
                    "name": "Languages",
                    "columns": 1,
                    "visible": true,
                    "id": "languages",
                    "items": []
                },
                "profiles": {
                    "name": "Profiles",
                    "columns": 1,
                    "visible": true,
                    "id": "profiles",
                    "items": []
                },
                "projects": {
                    "name": "Projects",
                    "columns": 1,
                    "visible": true,
                    "id": "projects",
                    "items": []
                },
                "publications": {
                    "name": "Publications",
                    "columns": 1,
                    "visible": true,
                    "id": "publications",
                    "items": []
                },
                "references": {
                    "name": "References",
                    "columns": 1,
                    "visible": true,
                    "id": "references",
                    "items": []
                },
                "skills": {
                    "name": "Skills",
                    "columns": 1,
                    "visible": true,
                    "id": "skills",
                    "items": [
                        {
                            "id": "eftybhzdugbxiuxbo5a65mtx",
                            "visible": true,
                            "name": "react",
                            "description": "good",
                            "level": 1,
                            "keywords": []
                        }
                    ]
                },
                "custom": {
                    "qmvrt3bog8rtxpg2anv35dje": {
                        "name": "Custom Section",
                        "columns": 1,
                        "visible": true,
                        "id": "qmvrt3bog8rtxpg2anv35dje",
                        "items": []
                    },
                    "z74xxwualnvj0lb1qfdohyus": {
                        "name": "Custom Section",
                        "columns": 1,
                        "visible": true,
                        "id": "z74xxwualnvj0lb1qfdohyus",
                        "items": []
                    }
                }
            },
            "metadata": {
                "template": "elegant",
                "layout": [
                    [
                        [
                            "profiles",
                            "summary",
                            "experience",
                            "education",
                            "projects",
                            "volunteer",
                            "references",
                            "custom.qmvrt3bog8rtxpg2anv35dje",
                            "custom.z74xxwualnvj0lb1qfdohyus"
                        ],
                        [
                            "skills",
                            "interests",
                            "certifications",
                            "awards",
                            "publications",
                            "languages"
                        ]
                    ]
                ],
                "css": {
                    "value": ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
                    "visible": false
                },
                "page": {
                    "margin": 18,
                    "format": "a4",
                    "options": {
                        "breakLine": true,
                        "pageNumbers": true
                    }
                },
                "theme": {
                    "background": "#ffffff",
                    "text": "#000000",
                    "primary": "#475569"
                },
                "typography": {
                    "font": {
                        "family": "IBM Plex Serif",
                        "subset": "latin",
                        "variants": [
                            "regular",
                            "italic",
                            "600"
                        ],
                        "size": 15.9
                    },
                    "lineHeight": 1.95,
                    "hideIcons": true,
                    "underlineLinks": false
                },
                "notes": ""
            }} }], // Add the new item with an empty resumedata object
          }));
        },
      }),
      {
        name: 'myStore', // Specify a name for local storage
        getStorage: () => localStorage, // Choose your storage (localStorage, sessionStorage, etc.)
      }
    )
  )
);

export const updateItem = (itemId: any, updatedData: any) => {
    const currentDateTime = dayjs();

// Format the date and time in ISO 8601 format
const formattedDateTime = currentDateTime.toISOString();

    updatedData.updatedAt=formattedDateTime;
    console.log('update2')
    useMyStore.setState((state:any) => ({
      items: state.items.map((item:any) =>
        item.id === itemId ? updatedData : item
      ),
    }));
  };

  export const deleteItem = (itemId: any) => {
    useMyStore.setState((state: any) => ({
        items: state.items.filter((item: any) => item.id !== itemId),
    }));
};
