import './card.css'

export default function Card(props) {

    return (
        <>
            <div className="card-parent center" key={props.i}>
                <div className="card-container">
                    <div className="card-title">
                        <h2>{props.data.title}</h2>
                        <p>{props.data.created_at}</p>
                    </div>
                    <div className="card-image">
                        <img src={props.data.image} alt="card img" />
                    </div>
                    <div className="card-content">
                        <p>{props.data.content}</p>
                    </div>
                    <div className="react-box">
                        <div className="react-btn">
                            <button>Like</button>
                        </div>
                        <div className="react-btn">
                            <button>Dislike</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
