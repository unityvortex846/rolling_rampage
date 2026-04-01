# Rolling Rampage

A browser-based aura-collection game inspired by Souls RNG games. Move your character through a dark world, roll for auras of increasing rarity, build up your luck through potions and gauntlets, and chase the rarest drops in the game.

## Play

[**Play on GitHub Pages →**](https://jenrum3ry.github.io/rolling_rampage/)

---

## Gameplay Overview

You control a third-person character in a moody game world. Press **Space** or click **Roll** to roll for a random aura. The rarer the aura, the bigger the visual effect, the more stats it grants, and the harder it is to obtain.

Use **WASD / arrow keys** to move your character around the world. Press **Space** to roll (or jump when auto-roll is active).

Progress is saved automatically — just enter a username to get started.

---

## Rarity Tiers

There are 14 rarity tiers, from most common to most rare:

| Tier | Chance Range | Color |
|---|---|---|
| Common | 1 in 2–4 | Gray |
| Uncommon | 1 in 5–9 | Green |
| Rare | 1 in 10–49 | Blue |
| Epic | 1 in 50–99 | Purple |
| Legendary | 1 in 100–999 | Amber |
| Mythic | 1 in 1,000–9,999 | Red |
| Exotic | 1 in 10,000–49,999 | Teal |
| Divine | 1 in 50,000–99,999 | Magenta |
| Extreme | 1 in 100,000–999,999 | Orange |
| Phantom | 1 in 1M–9.9M | Sky Blue |
| Exalted | 1 in 10M–99.9M | Pink |
| Rune | 1 in 100M–999M | Orange-Red |
| Ethereum | 1 in 1B+ | Cyan |
| Special | Developer only | White |

There are **95+ auras** to discover, ranging from the humble Ordinary (1 in 4) up to legendary drops like Ryan (1 in 2,012,000,000) and the developer-exclusive Rampage (1 in 1,000,000,000,000).

---

## Core Systems

### Luck

Everything in Rolling Rampage revolves around your **luck multiplier**. Luck is applied multiplicatively to every roll — a 1,000× luck multiplier makes a 1-in-1,000,000 aura effectively 1-in-1,000.

Luck stacks from multiple sources:
- **Active potions** (multiplicative with each other)
- **Equipped gauntlets** (additive bonus %, then multiplied in)
- **Active blessing** (+100% while running)

### Roll Speed

Roll speed determines how fast auto-roll fires. It stacks from:
- **Gauntlets** (e.g. Gauntlet of History gives 25× roll speed)
- **Potion of Enragement** (75× speed for 3 minutes)

---

## Potions

Potions are consumed from the **Potions tab** and take effect immediately.

| Potion | Effect |
|---|---|
| Beginner Potion | 10,000× luck for 1 roll (tutorial gift) |
| Minor Luck Potion | 10× luck for 5 rolls |
| Angelic Potion | 1,000× luck for 1 roll |
| Major Luck Potion | 1,000× luck for 3 rolls |
| Grand Luck Potion | 100,000× luck for 1 roll |
| Elixir of Wisdom | 10,000× luck for 1 roll |
| Techno Potion | 1,000× luck for 1 roll + chance to award Paranormal or Absolute |
| Supersonic Potion | Simulates 25 instant rolls, keeps 10 rarest |
| Portal Potion | Simulates 1,000 instant rolls, keeps 10 rarest |
| Acceleration Potion | Simulates 2,500 instant rolls, keeps 10 rarest *(brewer only)* |
| Elixir of Insanity | Simulates 30,000 instant rolls, keeps 10 rarest *(brewer only)* |
| Elixir of Sonaria | 1,000,000× luck for 1 roll *(brewer only)* |
| Potion of Enragement | 75× roll speed for 3 minutes |
| Biome-Changing Potion | Activates a random biome for 5 minutes |

---

## Gauntlets

Gauntlets are crafted by consuming specific auras from your inventory. Once crafted, they can be **equipped** (up to 2 at a time) to permanently boost your luck and/or roll speed.

| Gauntlet | Luck Bonus | Speed Bonus | Requirements |
|---|---|---|---|
| Gauntlet of Sparks | — | +10% | 10× Ordinary + 5× Surge |
| Gauntlet of Storms | +50% | — | 5× Ice + 2× Neon |
| Gauntlet of the Abyss | +100% | +25% | 3× Helix + 1× Sky |
| Gauntlet of Hellfire | +200% | — | 3× Scorched + 1× Nova |
| Gauntlet of Purity | +250% | +30% | 1× Odd + 1× Reign + 1× Primordial |
| Gauntlet of History | +150% | +2400% (25×) | 1× Flame + 1× Radiance + 1× Bounded |
| Gauntlet of Unknown Wisdom | +290% | +30% | 1× Voltage + 1× Scarlet |
| Gauntlet of Absolute Zero | +300% | +50% | 1× Tundra + 1× Glacier + 1× Arctic |
| Gauntlet of Maternity | +400% | +60% | 1× Solstice + 1× Eternity |

---

## Potion Brewer

The **⚗ Brewer tab** lets you craft powerful potions by consuming auras you've collected. Brewed potions are often much more powerful than shop potions.

| Recipe | Ingredients | Result |
|---|---|---|
| Love Potion | 15× Ordinary + 10× Surge | 50× luck for 100 rolls |
| Starlight Potion | 5× Ice + 3× Neon | 1,000× luck for 1 roll |
| Acceleration Potion | 2× Karma + 2× Scorched | Simulate 2,500 rolls |
| Elixir of Insanity | 2× Nova + 2× Vortex | Simulate 30,000 rolls |
| Elixir of Sonaria | 1× Odd + 1× Reign + 1× Primordial | 1,000,000× luck for 1 roll |

---

## Biome System

Biomes temporarily alter the drop rates for certain auras. When a biome is active, its name appears as a badge in the game world HUD.

### Starlight Biome
- Triggers automatically at **1 in 15,000 chance per second**
- Lasts **5 minutes**
- Boosts: Eclipsed (1 in 1.67M), Crystalline (1 in 11.5M)

### Midnight Biome
- Activated via **Biome-Changing Potion** (random between Starlight and Midnight)
- Lasts **5 minutes**
- Boosts 19 auras including Moonlight, Aurora, Shadow, Nebula, Nocturn, Ryan, and more

You can also use the **Biome-Changing Potion** from the Potions tab to force-activate a random biome instantly.

---

## Blessing Altar

Found in the **✦ Blessing tab**. Every 10 minutes, you can attempt a blessing:

- **50% success** — grants +100% luck for 5 minutes, then a 5-minute wait before next attempt
- **50% failure** — retry in 10 minutes

A live countdown shows when your next attempt is available. The blessing bonus stacks with all other luck multipliers.

---

## Special Aura Mechanics

Some auras have unique award conditions beyond rolling:

- **Frostbite** — 1 in 50 chance every 10 minutes to appear in your inventory passively
- **Gravitas** — 1 in 1,000,000 chance every second to be passively awarded
- **Paranormal** — Techno Potion exclusive (1 in 100 chance per roll while active)
- **Absolute** — Techno Potion exclusive (1 in 2,000 chance per roll while active)

---

## Auto Roll

Enable auto-roll in the **Auto Roll tab**. Roll speed tiers unlock progressively as you accumulate more total rolls:

| Speed | Interval | Unlock |
|---|---|---|
| Slow | 5s | Always unlocked |
| Normal | 2s | 100 rolls |
| Fast | 500ms | 500 rolls |
| Very Fast | 200ms | 2,000 rolls |
| Ultra | 75ms | 10,000 rolls |

The minimum effective interval is 50ms regardless of speed multipliers.

While auto-rolling, the most recently rolled aura is shown live in the top-left of the game world — no interaction needed.

---

## Equippable Auras

Any aura in your inventory can be **equipped** as a cosmetic from the Inventory tab. The equipped aura's visual effect is displayed on your character in the game world.

---

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deploys automatically to GitHub Pages on push to `main`.

---

*Rolling Rampage is a fan-made RNG game inspired by Souls RNG.*
