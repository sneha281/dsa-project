export { Stack }

class Stack{
    constructor(){
        this.size = 0;
        this.buffer = 4;
        this.stack = [];
    }

    clear(){
        this.size = 0;  //size 0 mtlab sare elements ko remove krenge
        this.stack = [];  //purani values htane ke liye 
    }

    isEmpty(){
        return  ( this.size === 0 );
    }

    top(){
        return this.stack[this.size-1];  //return the top most value
    }

    pop(){
        if(!this.isEmpty()) {
            this.size--;
            return this.stack.pop();
        } else{
            return [-1,''];
        }
    }

    push(type, char){
        if(this.isEmpty()){
            if(type===0)
                this.stack.push([type, char]);
        } else{
            let tmp = this.top();
            if(tmp[0]===type && tmp[1].length < this.buffer){
                let top = this.pop();
                top[1] = char + top[1];
                this.stack.push(top);
            } else{
                this.stack.push([type, char]);
            }
        }
        this.size++;
    }
}