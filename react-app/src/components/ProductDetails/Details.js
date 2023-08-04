import './Details.css'

function Detail({product}) {
    const specs = product.specs
    const specsArray = specs.split(',')
    const specsTitle = specsArray[1]
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
