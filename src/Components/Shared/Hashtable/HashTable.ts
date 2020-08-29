class HashTable {
    private storage: Array<any> = [];
    private storgaeLimit: number = 4;
    constructor(storageSize? : number) {
        this.storgaeLimit = this.storgaeLimit || 4;
    }

    private hash(key: string, max: any) {
        let hashChar = 0;
        for(let i = 0; i < key.length; i++) {
            hashChar += key.charCodeAt(i);
        }
        return hashChar % max;
    }

    public add(key: any, value: any): any {
        const index = this.hash(key, this.storgaeLimit);
        if(this.storage[index] === undefined) {
            this.storage[index] = [[key, value]]
        } else {
            let inserted = false;
            for(let i = 0; i < this.storage[index].length; i++) {
                if(this.storage[index][i][0] === key) {
                    this.storage[index][i][1] = value;
                    inserted = true;
                }
            }

            if(!inserted) {
                this.storage[index].push([key, value]);
            }
        }
        return this.storage;
    }

    public remove(key: any): any {
        const hashIndex = this.hash(key, this.storgaeLimit);
        if(this.storage[hashIndex].length === 1 && this.storage[hashIndex][0][0] === key) {
            this.storage.pop();
        } else {
            this.storage[hashIndex].forEach( (item: any, indx: any) => {
                if(item[indx][0] === key) {
                    delete this.storage[hashIndex][indx];
                }
            })
        }
        return this.storage;
    }

    public findByKey(key: any): any {
        const hashIndex = this.hash(key, this.storgaeLimit);
        let value = undefined;
        if(!this.storage[hashIndex]) return 'Hash table is empty.';
        this.storage[hashIndex].find( (item: any) => {
            if(item[0] === key) value = item[1];
        });
        return value;
    }
}

export default HashTable;