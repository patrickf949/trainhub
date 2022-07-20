

export default function Empty(props:{columns:number,label:string}) {
    const {columns,label}=props
    return (
        <tfoot>
           <tr>
            <td colSpan={columns}>
                No {label} available
            </td>
           </tr>
        </tfoot>
    );
};