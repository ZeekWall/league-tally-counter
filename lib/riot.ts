function checkForAPIKey() {
    const key = process.env.API_KEY;

    if (!key) {
        throw new Error('Missing API_KEY');
    } else {
        return key;
    }
};


export async function getMainPlayerMatches(playerId: string) {
    const apiKey = checkForAPIKey();

    const res = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerId}/ids?start=0&count=1`,
        {
            headers: {
                'X-Riot-Token': apiKey,
            },
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Riot API request failed (${res.status}): ${body}`);
    }

    return (await res.json()) as string[];
}