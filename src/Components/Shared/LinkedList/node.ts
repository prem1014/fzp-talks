class Node {
    public value: any;
    public next: any;
    constructor(value: any, next?: any) {
        this.value = value;
        this.next = next || null;
    }
}

export default Node;