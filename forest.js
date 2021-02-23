// /3f2mSU/OEyfI+hxCVgrtw。

// 安全級，0 ～ 20%；
// 注意級，20 ～ 40%；
// 警告級，40 ～ 60%；
// 危險級，60 ～ 80%；
// 最危險級，80 ～ 100%

Vue.component('eachData',{
    template:[
        "<div id='objBG'>",
            "<div id='obj-header' :class=setSafeColor(inputData.DANGERRATELEVEL)>",
                "<p>{{inputData.STTN_C}}-{{inputData.LOCATION}}",
                    "<a href='#' class='star' @click.prevent='starChange'>",
                        "<i class='fa-star' :class='inputData.starStatus?fas:far'></i>",
                    "</a>",
                "</p>",
            "</div>",
            "<div id='obj-body' :class=setSafeColor(inputData.DANGERRATELEVEL)>",
                "<p>所屬林管處:{{inputData.DIST_C}}</p>",
                "<p>發布時間:{{inputData.PublishDate}}</p>",
                "<p>有效時間:{{inputData.ValidityDate}}</p>",
                "<p>危險等級:{{inputData.DANGERRATELEVEL}}</p>",
            "</div>",
        "</div>"
    ].join(""),
    props:['inputData'],
    data() {
        return {
            fas:"fas",
            far:"far"
        }
    },
    methods:{
        setSafeColor( damgerRate ) {
            switch (damgerRate) {
                case '安全級': return 'state1'; break;
                case '注意級': return 'state2'; break;
                case '警告級': return 'state3'; break;
                case '危險級': return 'state4'; break;
                case '最危險級': return 'state5'; break;
                case '無資料或未上傳': return 'state6'; break;
            }
        },
        starChange() {
            console.log( this.inputData.starStatus )
            this.inputData.starStatus =! this.inputData.starStatus;
            console.log( this.inputData.starStatus );
            this.$emit( 'star', this.inputData );
        }
    }
})

var app = new Vue({
    el:"#vueApp",
    data:{
        datasJson: [],
        selectData: [],
        starData: [],
        meg:"apple"
    },
    methods:{
        getData() {
            // https://opendata.epa.gov.tw/api/v1/FRT00020?%24skip=0&%24top=1000&%24format=json
            const api = "https://opendata.epa.gov.tw/api/v1/FRT00020?%24skip=0&%24top=100&%24format=json";
            $.get(api).then(( response )=>{
                // console.log(response);
                this.datasJson = response;
                // console.log(this.datasJson);

                this.datasJson.forEach( (item) => {
                    this.$set(item, 'starStatus', false)
                });

                console.log(this.datasJson);
            })
        },
        starArray( item ) {
            console.log("aaa", this.starData.includes( item.SiteId ) )
            if( !this.starData.includes( item.SiteId ) ) {
                this.starData.push( item.SiteId )
                this.selectData.push( item )
            }
            else {
                let idx = this.starData.indexOf(item.SiteId)
                this.starData.splice( idx, 1 )
                this.selectData.splice( idx, 1 )
            }
        },
        clearStar() {
            this.datasJson.forEach((item)=>{
                item.starStatus = false
            })
            this.starData = []
            this.selectData = []
        }
    },
    computed:{
        filtData() {
            // console.log(this.datasJson);
            return this.datasJson;
        },
        selectedData() {
            return this.selectData
        },
    },
    mounted(){
        this.getData();
    }
})