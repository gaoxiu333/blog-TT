'use client'
const ClientLog = ({ data }: any) => {
    console.log('init log', data)
    const log = () => {
        console.log('data log', data)
    }
    return (<div onClick={log}>log</div>)
}

export { ClientLog }