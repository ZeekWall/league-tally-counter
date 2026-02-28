import { NextRequest, NextResponse } from 'next/server';
import { PLAYERS } from '@/lib/constants';
import { getPlayerMatches } from '@/lib/riot';

export async function GET(request: NextRequest) {
    const player = request.nextUrl.searchParams.get('player') as keyof typeof PLAYERS;
    const playerId = PLAYERS[player].puuid;

    if (!playerId) {
        return NextResponse.json({ error: 'Invalid player' }, { status: 400 });
    }

    try {
        const matchIds = await getPlayerMatches(playerId);
        return NextResponse.json({ matchIds });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
