// Bets Service - Fetches bets data dynamically
// In production, replace this with actual API calls

const GAMES = [
  { name: "Plinko", icon: "StakePlinko" },
  { name: "Flip", icon: "StakeFlip" },
  { name: "Limbo", icon: "StakeLimbo" },
  { name: "Dragon Tower", icon: "StakeDragonTower" },
  { name: "Blackjack", icon: "StakeBlackjack" },
  { name: "Roulette", icon: "StakeRoulette" },
  { name: "Crash", icon: "StakeCrash" },
  { name: "Mines", icon: "StakeMines" },
  { name: "Dice", icon: "StakeDice" },
  { name: "Keno", icon: "StakeKeno" },
  { name: "Thunder vs Underworld Enhanced RTP", icon: "Slots" },
  { name: "Clover Gold", icon: "Slots" },
  { name: "Sweet Bonanza", icon: "Slots" },
  { name: "Gates of Olympus", icon: "Slots" },
];

const CURRENCIES = ["BTC", "USDT", "USDC", "CAD", "BNB", "ETH", "LTC", "SOL", "TRX", "XRP", "ARS", "CLP"];
const USERNAMES = [
  "ryankety", "mitchelljarvis", "tosintoolz1", "ramouz450",
  "player123", "gamer456", "betmaster", "lucky777", "highroller",
  "casinoking", "jackpot", "winner99", "progamer", "betpro"
];

// Generate a random bet
function generateRandomBet() {
  const game = GAMES[Math.floor(Math.random() * GAMES.length)];
  const currency = CURRENCIES[Math.floor(Math.random() * CURRENCIES.length)];
  const isHidden = Math.random() > 0.6; // 40% chance of being hidden
  const user = isHidden ? null : USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
  
  const betAmount = Math.random() * 5000 + 1; // Random between 1 and 5001
  const multiplier = Math.random() * 100; // Random between 0 and 100
  const payout = betAmount * multiplier - betAmount; // Profit/loss
  
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${displayHours}:${displayMinutes} ${ampm}`;

  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    game: game.name,
    gameIcon: game.icon,
    user,
    isHidden,
    time,
    betAmount: parseFloat(betAmount.toFixed(2)),
    currency,
    multiplier: parseFloat(multiplier.toFixed(2)),
    payout: parseFloat(payout.toFixed(2)),
    payoutCurrency: currency,
    timestamp: Date.now(),
  };
}

// Simulate API delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// GraphQL queries for different tabs
const GRAPHQL_QUERIES = {
  'all-bets': `query AllHouseBets($limit: Int = 10) {
  allHouseBets(limit: $limit) {
    ...RealtimeHouseBet
  }
}

fragment RealtimeHouseBet on Bet {
  id
  iid
  game {
    name
    icon
  }
  bet {
    __typename
    ... on CasinoBet {
      id
      active
      payoutMultiplier
      amountMultiplier
      amount
      payout
      updatedAt
      currency
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on EvolutionBet {
      id
      amount
      currency
      createdAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on MultiplayerCrashBet {
      id
      payoutMultiplier
      amount
      payout
      currency
      updatedAt
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on MultiplayerSlideBet {
      id
      payoutMultiplier
      amount
      payout
      currency
      updatedAt
      createdAt
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on SoftswissBet {
      id
      amount
      currency
      updatedAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on ThirdPartyBet {
      id
      amount
      currency
      updatedAt
      createdAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
  }
}`,
  'high-rollers': `query HighrollerHouseBets($limit: Int = 10) {
  highrollerHouseBets(limit: $limit) {
    ...RealtimeHouseBet
  }
}

fragment RealtimeHouseBet on Bet {
  id
  iid
  game {
    name
    icon
  }
  bet {
    __typename
    ... on CasinoBet {
      id
      active
      payoutMultiplier
      amountMultiplier
      amount
      payout
      updatedAt
      currency
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on EvolutionBet {
      id
      amount
      currency
      createdAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on MultiplayerCrashBet {
      id
      payoutMultiplier
      amount
      payout
      currency
      updatedAt
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on MultiplayerSlideBet {
      id
      payoutMultiplier
      amount
      payout
      currency
      updatedAt
      createdAt
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on SoftswissBet {
      id
      amount
      currency
      updatedAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on ThirdPartyBet {
      id
      amount
      currency
      updatedAt
      createdAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
  }
}`,
  'race-leaderboard': `query ActiveRaces($limit: Int = 10) {
  activeRaces {
    ...RaceFragment
    leaderboard(limit: $limit) {
      ...RacePosition
    }
    userPosition {
      ...RacePosition
    }
  }
}

fragment RaceFragment on Race {
  id
  name
  description
  currency
  type
  startTime
  endTime
  status
  scope
  promotionPeriod
}

fragment RacePosition on RacePosition {
  position
  user {
    id
    name
    preferenceHideBets
  }
  wageredAmount
  payoutAmount
  percentage
  currency
}`,
  'my-bets': `query AllHouseBets($limit: Int = 10) {
  allHouseBets(limit: $limit) {
    ...RealtimeHouseBet
  }
}

fragment RealtimeHouseBet on Bet {
  id
  iid
  game {
    name
    icon
  }
  bet {
    __typename
    ... on CasinoBet {
      id
      active
      payoutMultiplier
      amountMultiplier
      amount
      payout
      updatedAt
      currency
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on EvolutionBet {
      id
      amount
      currency
      createdAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on MultiplayerCrashBet {
      id
      payoutMultiplier
      amount
      payout
      currency
      updatedAt
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on MultiplayerSlideBet {
      id
      payoutMultiplier
      amount
      payout
      currency
      updatedAt
      createdAt
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on SoftswissBet {
      id
      amount
      currency
      updatedAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
    ... on ThirdPartyBet {
      id
      amount
      currency
      updatedAt
      createdAt
      payout
      payoutMultiplier
      user {
        id
        name
        preferenceHideBets
      }
    }
  }
}`
};

// Transform bet data from GraphQL response to our format
function transformBetData(betData) {
  if (!betData || !betData.bet) return null;
  
  const bet = betData.bet;
  const user = bet.user;
  const isHidden = user?.preferenceHideBets || false;
  const userName = isHidden ? null : user?.name || null;
  
  // Get timestamp from different bet types
  const timestamp = bet.updatedAt || bet.createdAt || Date.now();
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${displayHours}:${displayMinutes} ${ampm}`;
  
  // Get multiplier (payoutMultiplier or amountMultiplier)
  const multiplier = bet.payoutMultiplier || bet.amountMultiplier || 0;
  
  // Normalize currency to uppercase
  const currency = bet.currency ? bet.currency.toUpperCase() : 'USD';
  
  return {
    id: betData.id || bet.id,
    game: betData.game?.name || 'Unknown',
    gameIcon: betData.game?.icon || 'Slots',
    user: userName,
    isHidden,
    time,
    betAmount: bet.amount || 0,
    currency: currency,
    multiplier: parseFloat(multiplier.toFixed(2)),
    payout: bet.payout || 0,
    payoutCurrency: currency,
    timestamp: new Date(timestamp).getTime(),
  };
}

// Transform race leaderboard data
function transformRaceData(raceData) {
  if (!raceData || !raceData.activeRaces || raceData.activeRaces.length === 0) {
    return [];
  }
  
  const activeRace = raceData.activeRaces[0];
  const leaderboard = activeRace.leaderboard || [];
  
  return leaderboard.map((position, index) => {
    const user = position.user;
    const isHidden = user?.preferenceHideBets !== false; // All race users are hidden by default
    const userName = isHidden ? null : user?.name || null;
    
    // Use payoutAmount from API if available, otherwise calculate prize based on position
    const prizes = [25000, 12000, 8000, 6000, 5000, 3500, 2500, 2000, 1500, 1000];
    const prize = position.payoutAmount ? parseFloat(position.payoutAmount) : (prizes[position.position - 1] || 500);
    
    return {
      id: `race-${position.position}`,
      rank: position.position,
      user: userName,
      isHidden,
      wagered: position.wageredAmount ? parseFloat(position.wageredAmount) : 0,
      prize: parseFloat(prize.toFixed(2)),
      currency: position.currency || activeRace.currency || 'USD',
      timestamp: Date.now() - index * 1000,
    };
  });
}

// Fetch bets based on tab type using GraphQL
export async function fetchBets(tab = "all-bets", limit = 10) {
  try {
    // GraphQL API endpoint
    const GRAPHQL_URL = 'https://stake.com/_api/graphql';
    
    const query = GRAPHQL_QUERIES[tab] || GRAPHQL_QUERIES['all-bets'];
    
    // Make GraphQL request
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables: { limit }
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const result = await response.json();
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      // Fall back to mock data on error
      throw new Error(result.errors[0].message);
    }
    
    // Transform GraphQL response to our format
    if (tab === 'race-leaderboard') {
      const transformed = transformRaceData(result.data);
      if (transformed.length > 0) {
        return transformed;
      }
    } else {
      const bets = result.data.allHouseBets || result.data.highrollerHouseBets || [];
      const transformed = bets.map(transformBetData).filter(bet => bet !== null);
      if (transformed.length > 0) {
        return transformed;
      }
    }

    // Fallback to mock data if API returns empty or fails
    await delay(200 + Math.random() * 100); // 200-300ms delay

    const bets = [];
    const count = limit === 0 ? 0 : limit;

    for (let i = 0; i < count; i++) {
      bets.push(generateRandomBet());
    }

    // Sort by timestamp (newest first)
    bets.sort((a, b) => b.timestamp - a.timestamp);

    // Filter based on tab
    let filteredBets = bets;
    if (tab === "high-rollers") {
      // High rollers: bets with amount > 100
      filteredBets = bets.filter(bet => bet.betAmount > 100);
    } else if (tab === "race-leaderboard") {
      // Race leaderboard: generate stable race-specific data
      filteredBets = [];
      const raceCount = limit === 0 ? 10 : Math.min(limit, 10);
      
      // Use stable seed for consistent data
      const seed = 12345; // Fixed seed for stable results
      const seededRandom = (index) => {
        const x = Math.sin((seed + index) * 12.9898) * 43758.5453;
        return x - Math.floor(x);
      };
      
      for (let i = 0; i < raceCount; i++) {
        // All users in race leaderboard are hidden
        const isHidden = true;
        const user = null;
        const wagered = (seededRandom(i + 200) * 40000000 + 2000000); // $2M - $42M
        const prizes = [25000, 12000, 8000, 6000, 5000, 3500, 2500, 2000, 1500, 1000];
        const prize = prizes[i] || 500;
        
        filteredBets.push({
          id: `race-${i}`, // Stable ID based on index
          rank: i + 1,
          user,
          isHidden,
          wagered: parseFloat(wagered.toFixed(2)),
          prize: parseFloat(prize.toFixed(2)),
          currency: "USD",
          timestamp: Date.now() - i * 1000,
        });
      }
      // Sort by wagered (highest first)
      filteredBets.sort((a, b) => b.wagered - a.wagered);
      // Reassign ranks after sorting
      filteredBets.forEach((bet, index) => {
        bet.rank = index + 1;
      });
    }

    return filteredBets;
  } catch (error) {
    console.error('Error fetching bets:', error);
    throw error;
  }
}

// Get game icon component (this will be handled in the component)
export function getGameIconName(gameName) {
  const game = GAMES.find(g => g.name === gameName);
  return game ? game.icon : "Slots";
}

