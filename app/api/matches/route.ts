import { NextRequest, NextResponse } from 'next/server';
import { PLAYERS } from '@/lib/constants';
import { getMainPlayerMatches } from '@/lib/riot';

export async function GET(request: NextRequest) {
    const player = request.nextUrl.searchParams.get('player') as keyof typeof PLAYERS | null;
    const playerId = player ? PLAYERS[player].puuid : null;

    if (!playerId) {
        return NextResponse.json({ error: 'Invalid player' }, { status: 400 });
    }

    try {
        const matchIds = await getMainPlayerMatches(playerId);
        return NextResponse.json({ matchIds });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
