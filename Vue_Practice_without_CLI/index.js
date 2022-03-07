var app = new Vue({
    el: '#app',
    data: {
        List: [
            {
                id: 1,
                name: 'iPhone 7',
                price: 6188,
                count: 1,
                selected: true
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1,
                selected: true
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1,
                selected: true
            }
        ],
        total: true,
        message: 123,
    },
    computed: {
        totalPrice: function(){
            var total = 0;
            for (var i = 0; i < this.List.length; i++){
                var item = this.List[i];
                if (item.selected === true)
                    total += item.price * item.count
            };
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
    },
    methods: {
        handleReduce: function(index){
            if (this.List[index].count === 0) return;
            this.List[index].count--;
        },
        handleAdd: function(index){
            this.List[index].count++
        },
        handleRemove: function(index){
            this.List.splice(index, 1)
        },
        checkAll: function(){
            if (this.total === true){
                this.total = false;
                for (var j = 0; j < this.List.length; j++){
                    this.List[j].selected = false;
                };
            }
            else {
                this.total = true;
                for (var k = 0; k < this.List.length; k++){
                    this.List[k].selected = true;
                };
            }
                
            
        },
        check: function(index){
            if (this.List[index].selected === true)
                this.List[index].selected = false;
            else
                this.List[index].selected = true;
        },
        handleInput: function(e){
            this.message = e.target.value;
        },
    }
})