import './InfoBox.css'

export default function InfoBox(info)
{
    return (
        <div className="infobox">
            <div className="name">{info.name}</div>
            <div className="depname">{info.depName}</div>
        </div>
    )
}