import Node from './node';

class LinkedList {
    public size: any;
    public head: any;
    public tail: any;
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    public prepend(value: any): any {
        this.size += 1;

        const node = new Node(value, this.head);

        this.head = node;
        if(!this.tail) this.tail = node;
        return this;
    }

    public append(value: any): any {
        this.size += 1;

        const node = new Node(value);
        if(!this.head) {
            this.head = node;
            this.tail = node;
            return this;
        }

        this.tail.next = node;
        this.tail = node;
        return this;
    }
}

export default LinkedList;