class LinkedList {
    constructor() {
        this.head = null;
    }

    /**
     * Static method to create a Node for the linked list
     * @param {*} value 
     * @returns 
     */
    static Node(value) {
        return { value: value, next: null}; 
    }

    /**
     * takes a value, creates a node and appends it to a list
     * @param {*} value 
     * @returns 
     */
    append(value) {
        const newNode = LinkedList.Node(value);
        
        if (!this.head) {
            this.head = newNode;
            return;
        }

        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }
        curr.next = newNode
    }

    /**
     * create new node with value and adds this node to the beginning of the list
     * @param {*} value 
     * @returns 
     */
    prepend(value) {
        const newNode = LinkedList.Node(value);

        if (!this.head) { // current linked list is non-existent
            this.head = newNode; // new node is the new head
            return;
        } else {
            newNode.next = this.head; // the pointer of newNode is the current head
            this.head = newNode; // current head is the new node
        }
    }

    /**
     * Traverses linked list to search for value
     * returns value if found, null if not
     * @param {*} value 
     * @returns 
     */
    find(value) {        
        let curr = this.head;
        while (curr !== null) {
            if (curr.value === value) {
                // console.log(`found: ${curr.value}`);
                return curr.value;
            }
            curr = curr.next;            
        }
        // console.log(`${value} was not found...`);
        return null; // if not found
    }

    /**
     * Finds the value and removes it from the linked list
     * @param {*} value 
     */
    delete(value) {
        let curr = this.head;
        if (curr !== null) {
            if (this.find(value)) {
                console.log(`found: ${this.find(value)}\nTODO: figure out\n\tDelete Head\n\tDelete middle\n\tDelete End/Tail`);

            }
        }
        return null;
    }

    /**
     * prints current linked list into console
     */
    printList() {
        let currArr = [];
        let curr = this.head;
        while (curr !== null) {
            currArr.push(curr.value);
            curr = curr.next
        }
        console.log(currArr);
    }
}

let newList = new LinkedList();
newList.append(10);
newList.append(20);
newList.append(30);
newList.prepend(5);
// newList.printList();
newList.prepend(2);
newList.prepend(1);
newList.printList();
newList.delete(10);




// console.log(newList.printList());


const LinkedListComp = () => {
    // console.log('testing LinkedListComp...');
    return (<></>);
}

export default LinkedListComp;