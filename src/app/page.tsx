"use client";

import streamSaver from "streamsaver";

streamSaver.mitm = "http://localhost:3000/mitm.html";

function sleep(miliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, miliseconds);
    });
}

function randomUint32() {
    return Math.floor(Math.random() * 4294967296);
}

function randomData(bytelength: number): Uint8Array {
    const length = bytelength / 4;
    const ar = new Uint32Array(length);
    for (let i = 0; i < length; ++i) {
        ar[i] = randomUint32();
    }

    return new Uint8Array(ar.buffer);
}

async function foo() {
    const stream = streamSaver.createWriteStream("foo.bin");

    const writer = stream.getWriter();
    await writer.ready;
    for (let i = 0; i < 4096; ++i) {
        await writer.write(randomData(1024 * 1024));
        await sleep(5000);
    }
    await writer.close();
}

export default function Home() {
    return (
        <main>
            <button onClick={foo}>ファイル書き込み</button>
        </main>
    );
}
