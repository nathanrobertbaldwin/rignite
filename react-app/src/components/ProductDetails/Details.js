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
            <div id='included-list'>
                {/* this is just hardcode */}
                <h2>Included</h2>
                <ul>
                    <li id='individual-spec'>
                        USB-A to USB-C cable
                    </li>
                    <li id='individual-spec'>
                        Keycap puller
                    </li>
                    <li id='individual-spec'>
                        3-Year Standard Warranty
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Detail
