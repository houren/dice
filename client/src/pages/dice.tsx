import { useState, useRef } from 'react';
const MAXCOUNT = 10;
const MINCOUNT = 3;
const Dice = () => {
    const [count, setCount] = useState(1);
    const [result, setResult] = useState<{ rolls: number[], sum: number } | null>(null);
    const fixedCountRef = useRef<number>(count);

    const handleRoll = async () => {
        if(!Number.isInteger(count) || count <= 0){
            alert("サイコロを振る回数は正の整数にしてください");
            return;
        }
        if(count>MAXCOUNT){
            alert("サイコロを振る回数が大きすぎます");
            return;
        }
        if(count<MINCOUNT){
            alert("サイコロを振る回数が小さすぎます");
            return;
        }
        fixedCountRef.current = count;
        const apiUrl = `http://localhost:3001`; // 環境変数依存にする
        try{
            const res = await fetch(`${apiUrl}/api/roll`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ count }),
            });
            const data = await res.json();
            if(!res.ok) return;
            setResult(data);
        }catch(err){
            if(err instanceof Error){
                alert('エラー: ${err.message}');
            }else{
                alert("予期せぬエラーが発生しました");
            }
        }
    };
    return (
        <div style={{padding: "2rem"}}>
            <h1>サイコロを振るやつ</h1>
            <p>振る回数を入れてね</p>
            <div>
                <input
                    type = "number"
                    value = {count}
                    onChange = {(e) => setCount(Number(e.target.value))}
                    style={{ padding: '4px', fontSize: '16px' }}
                    min={MINCOUNT}
                    max={MAXCOUNT}
                />
                <button onClick={() => handleRoll()}>サイコロを振る</button>
            </div>
            {result && (
                // 結果表示
                <div style={{ marginTop: "1rem" }}>
                    <p>合計: {result.sum}</p>
                    <p>平均: {(result.sum / fixedCountRef.current).toFixed(2)}</p>
                    <p>出目: {result.rolls.join(', ')}</p>
                </div>
            )}
        </div>
    );
}
export default Dice;
