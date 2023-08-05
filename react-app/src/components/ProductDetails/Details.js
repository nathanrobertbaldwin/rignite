import './Details.css'
import { useSelector } from 'react-redux'

function Detail({product}) {

    const categories = useSelector(state=>state.categories)
    const prodType = categories[product.category_id].name;

    const specs = product.specs
    const specsTitle = `${prodType==='Mice'?'Mouse': prodType==="Keyboards"?"Keyboard": prodType==="Speakers"?"Speaker":prodType} Specifications`
    const specsArray = specs.split(',');
    const specsInfo = specsArray.slice(1)

    return (
        <div id='overview-specs-container'>
            <div id='specs-list'>
                <h2>{specsTitle}</h2>
                <ul>
                    {specsInfo?.map((spec) => (
                        <li id='individual-spec'>
                            {spec}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Detail
