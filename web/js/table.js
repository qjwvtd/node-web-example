/*
 * 2018/2/7
 * administractor
 */
class Table{
    constructor(head,colWidth,keys,data){
        this.head = head || [];
        this.colWidth = colWidth || [];
        this.keys = keys || [];
        this.data = data || [];
    }
    renderTable(){
        var head = this.head;
        var colWidth = this.colWidth;
        var data = this.data;
        var keys = this.keys;
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        for(var i=0,len=head.length;i<len;i++){
            var htd = document.createElement('td');
            htd.style.width = colWidth[i];
            htd.innerHTML = head[i];
            thead.appendChild(htd);
        }
        for(var j=0,jlen=data.length;j<jlen;j++){
            var tr = document.createElement('tr');
            for(var a=0,alen=keys.length;a<alen;a++){
                var td = document.createElement('td');
                td.innerHTML = data[j][keys[a]];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }
}
export {Table}

