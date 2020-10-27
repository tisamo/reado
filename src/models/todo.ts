export class TodoModel {
    id: number;
    name:string;
    description: string;
    category: string;
    priority: any;

    constructor(name: string, description: string, category: string, priority: any) {
        this.id = 0;
        this.name = name;
        this.description = description;
        this.category = category;
        this.priority = priority;
    }

}
