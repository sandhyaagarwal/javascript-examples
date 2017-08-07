var LinkedList = function() {
  this._head = null;
  this._tail = null;
}

var Node = function(data) {
  this.data = data;
  this.next = null;
}

LinkedList.prototype.add = function(data) {
  var newNode = new Node(data);
  if (this._head == null) {
    this._head = newNode;
    this._tail = newNode;
  } else {
    var node = this._head;
    while (node != this._tail) {
      node = node.next;
    }
    node.next = newNode;
    this._tail = newNode;
  }
}

LinkedList.prototype.remove = function(data) {
  var nodeToBeRemoved = this._head;
  if (nodeToBeRemoved == null) {
    console.log("The list is empty and nothing can be removed");
    return;
  }
  
  var prev;
  while(nodeToBeRemoved.data !== data) {
  	prev = nodeToBeRemoved;
    nodeToBeRemoved = nodeToBeRemoved.next;
  }
	
  if(this._head == nodeToBeRemoved && this._tail == nodeToBeRemoved) {
  	console.log("Removing the only node in the list");
    this._head = null;
    this._tail = null;    
  } else if(this._tail == nodeToBeRemoved) {
  	console.log("Removing the last node from the list");
    prev.next = null;
    this._tail = prev;
    nodeToBeRemoved = null;
  }  else if(this._head == nodeToBeRemoved) {
  	this._head = nodeToBeRemoved.next;
    nodeToBeRemoved = null;
  } else {
 	  prev.next = nodeToBeRemoved.next;
		nodeToBeRemoved = null;		
	}
}

LinkedList.prototype.print = function() {
  if (this._head == null) {
    console.log("The list is empty");
  }

  var node = this._head;
  while (node != null) {
    console.log(node.data);
    node = node.next;
  }
  
  console.log("\n\n");
}





