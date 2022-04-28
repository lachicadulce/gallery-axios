import React from "react";
import axios from "axios";

interface photo {
   server: string,
   id: string,
   secret: string 
}
export default class SearchComp extends React.Component<{}, {loading:boolean, imageData:any}>{
    constructor(props: photo){
        super(props);
        this.state = {
            loading: true,
            imageData: null
        }
    }
    btnSearchClickFn = async()=>{
        //input에 적은걸 가져와서 보내기??
        const {data} = await axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${query}&per_page=24&format=json&nojsoncallback=1');
        this.setState(current => ({
            ...current,
            loading: false,
            axiosData: data
        }))
        return data;
    }
    componentDidMount(): void {
        this.btnSearchClickFn();
    }

    render(){
        function content(){
            for(const photo of this.btnSearchClickFn()){
                //<img src="https://live.staticflickr.com/"+ {photo.server}+"/"+{photo.id}+"_"+{photo.secret}+"_q.jpg"/>
            }
        }
        return(
            <>
                <div style={{border: 'solid 1px black', padding: '10px'}}>
                    <input name="searchWord" type="text" />
                    <button onClick={this.btnSearchClickFn}>검색</button>
                </div>
                <div style={{padding: '50px'}}>
                    {
                        this.state.loading ?
                            <div>
                                <h2>Now Loading</h2>
                            </div>
                            :
                            <>
                                <h2>Loading Complete</h2>
                                {content()}
                                <img src="" alt="" />
                            </>
                    }
                </div>
            </>
            
        )
    }
}