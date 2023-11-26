const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); // ClusterApiUrl provides url for the "devnet";

const getWalletBalance = async() =>{
    try{
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`wallet balance is ${walletBalance}`)
    }   catch(err){
        console.error(err);
    }
}

const airDropSol = async() => {
    try {
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);
        await connection(fromAirDropSignature);
    } catch (error) {
        console.log(error)
    }
}
const main = async() =>{
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

main()
