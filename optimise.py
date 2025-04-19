import random

temp = 0.99  # starting temperature (if using simulated annealing or just a loop)
best_bet1 = random.randint(1, 99)
best_bet2 = 100 - best_bet1
best_profit = 0

def odds_and_profit(bet1, bet2):
    out1 = (bet1 * 1.5) - bet2  # profit if outcome 1 wins
    out2 = (bet2 * 10) - bet1   # profit if outcome 2 wins

    # Only consider it if both outcomes give a profit or break-even
    if out1 >= 0 and out2 >= 0:
        return min(out1, out2)  # Return the *guaranteed* profit (worst case)
    else:
        return -1  # Invalid

while temp > 0.00001:
    candidate_bet1 = random.randint(1, 99)
    candidate_bet2 = 100 - candidate_bet1
    profit = odds_and_profit(candidate_bet1, candidate_bet2)

    if profit > best_profit:
        best_profit = profit
        best_bet1 = candidate_bet1
        best_bet2 = candidate_bet2

    temp *= 0.999  # Decrease temp to slowly end loop

print(f"Best bet split: Bet1 = ${best_bet1}, Bet2 = ${best_bet2}")
print(f"Guaranteed profit: ${round(best_profit, 2)}")
