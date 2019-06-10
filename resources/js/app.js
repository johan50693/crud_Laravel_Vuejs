
new Vue({
    el:'#crud',
    created: function () {
        this.getKeeps();
    },
    data:{
        keeps:[],
        newKeep: '',
        errors: [],
        fillKeep: {'id':'' , 'keep':''},
        pagination: {
            'total'         : 0,
            'current_page'  : 0,
            'per_page'      : 0,
            'last_page'     : 0,
            'from'          : 0,
            'to'            : 0,
        },
        offset: 3,
    },
    computed:{
        isActive: function(){
            return this.pagination.current_page;
        },
        pagesNumber: function(){
            if(!this.pagination.to){
                return [];
            }

            var from= this.pagination.current_page-this.offset;
            if(from < 1){
                from = 1;
            }

            var to= from+(this.offset+2);
            if(to >= this.pagination.last_page){
                to= this.pagination.last_page;
            }

            var pagesArray=[];
            while(from <= to){
                pagesArray.push(from);
                from++;
            }

            return pagesArray;

        }
    },
    methods:{
        getKeeps: function(page){
            var urlKeeps='task?page='+page;
            axios.get(urlKeeps).then(response => {
                this.keeps=response.data.task.data,
                this.pagination= response.data.pagination
            });
        },
        editKeep: function (keep){
            this.fillKeep.id= keep.id;
            this.fillKeep.keep= keep.keep;
            $("#edit").modal('show');
        },
        updateKeep: function(id){
            var url= 'task/'+id;
            axios.put(url, this.fillKeep).then(response =>{
                this.getKeeps();
                this.fillKeep={'id':'' , 'keep':''};
                this.errors=[];
                $('#edit').modal('hide');
                toastr.success('Tarea actualizada con exito');
            }).catch(error => {
                this.errors= error.response.data;
            });
        },
        deleteKeep: function(keep){
            var urlKeeps= 'task/'+keep.id;
            axios.delete(urlKeeps).then(response =>{
                this.getKeeps();
                toastr.success('Se ha procesado la eliminación de forma correcta..');
            });
        },
        createKeep: function(){
            var url= 'task';
            axios.post(url,{
                keep: this.newKeep
            }).then(response =>{
                this.getKeeps();
                this.newKeep='';
                this.errors=[];
                $('#create').modal('hide');
                toastr.success('Nueva tarea creada de manera exitosa');
            }).catch(error => {
                this.errors= error.response.data;
            })
        },
        changePage: function(page){
            this.pagination.current_page=page;
            this.getKeeps(page);
        }
    }
});