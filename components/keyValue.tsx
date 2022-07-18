
export default function keyValue({ name, value }:  { name: string, value: any } ) {
    return (
        <div className="row">
            <div className="col">{name}</div>
            <div className="col"><strong className="float-right">{value}</strong></div>
            <hr />
        </div>
    );
}