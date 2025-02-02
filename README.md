# SRV Schedule

A simple interface to the SRV sewage schedule API. Make it possible to get the next sewage schedule for a given address. See: https://www.srvatervinning.se/avfallshamtning/nar-hamtar-vi-ditt-avfall

## Installation

```bash
npm install @crusaider/srv-schedule
```

## Usage

### Lookup customer details for a given address

```typescript
import { findSuggestions } from '@crusaider/srv-schedule';

findSuggestions('Rudsjöterrassen 2').then((suggestions) => {
  console.log(suggestions);
});
```

### Find the next sewage schedule for a given address

```typescript
import { search } from '@crusaider/srv-schedule';

search('Rudsjöterrassen 2').then((schedule) => {
  console.log(schedule);
});
```

# Disclaimer

This is not an official API and may break at any time. Use at your own risk. This is a hobby project and is not affiliated with SRV in any way.
