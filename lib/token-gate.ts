// Token gating utilities
import { createPublicClient, http, formatUnits } from 'viem';
import { base } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

// ERC20 ABI for balance checking
const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
] as const;

// Check if user holds minimum token balance
export async function checkTokenBalance(
  tokenAddress: `0x${string}`,
  userAddress: `0x${string}`,
  minBalance: number = 0
): Promise<{ hasAccess: boolean; balance: string }> {
  try {
    const [balance, decimals] = await Promise.all([
      publicClient.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [userAddress],
      }),
      publicClient.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ]);

    const formattedBalance = formatUnits(balance, decimals);
    const hasAccess = Number(formattedBalance) >= minBalance;

    return { hasAccess, balance: formattedBalance };
  } catch (error) {
    console.error('Error checking token balance:', error);
    return { hasAccess: false, balance: '0' };
  }
}

// Token gate wrapper component example
export function createTokenGate(tokenAddress: `0x${string}`, minBalance: number = 1) {
  return {
    tokenAddress,
    minBalance,
    check: (userAddress: `0x${string}`) => checkTokenBalance(tokenAddress, userAddress, minBalance),
  };
}
