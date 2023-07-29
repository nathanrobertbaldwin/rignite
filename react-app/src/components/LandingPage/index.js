import './LandingPage.css'


export default function Landing() {
    return (
        <>
            <h1>Shop by Category</h1>
            <div id='catagories'>
                <div id='KB'>
                    <img className='cateImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg' alt='' />
                    <p>KeyBoards   →</p>
                </div>
                <div id='Sp'>
                    <img className='cateImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg' alt='' />
                    <p>Speakers   →</p>
                </div>
                <div id='HP'>
                    <img className='cateImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg' alt='' />
                    <p>Headphones   →</p>
                </div>
                <div id='MP'>
                    <img className='cateImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg' alt='' />
                    <p>Mousepads   →</p>
                </div>
                <div id='Mi'>
                    <img className='cateImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg' alt='' />
                    <p>Mice   →</p>
                </div>
            </div>
        </>
    )
}
