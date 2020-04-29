import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Line, Circle } from 'rc-progress';
import { colors } from '../shared/styled/theme';
import bullet from '../../img/bullet.jpg';

export default function EffectsPane({ effects, imgPanel, imgBorder }) {
  return (
    <>
      {/* <EffectsTitle>Effects:</EffectsTitle> */}
      <EffectsContent>
        {effects
          .filter(e => e.flags[0] === 'DEBUFF')
          .map(effect => <Effect key={effect.uuid} effect={effect} />)}
        {effects
          .filter(e => e.flags[0] === 'BUFF')
          .map(effect => <Effect key={effect.uuid} effect={effect} />)}
      </EffectsContent>
    </>
  )
}

const Bar = ({ current, max, flags = [] }) => {
  return (
    <BarContainer >
      <Line percent={current / max * 100}
        strokeWidth="50"
        trailWidth="50"
        trailColor={getColor(flags, 'trail')}
        strokeColor={getColor(flags, 'stroke')}
        strokeLinecap="butt"
      />
    </BarContainer >
  )
};
function getColor(flags, type) {
  if (flags[0] === "BUFF") {
    if (type === 'stroke') { return colors.cyan }
    if (type === 'trail') { return colors.complementaryDark1 }
  } else if (flags[0] = "DEBUFF") {
    if (type === 'stroke') { return colors.primary }
    if (type === 'trail') { return colors.complementaryDark2 }
  } else {
    if (type === 'stroke') { return colors.primary }
    if (type === 'trail') { return colors.primaryText }
    return colors.secondary;
  }

}

const Effect = ({ effect }) => {
  const { flags = [], name, short, remaining, duration } = effect;
  const remainingFormat = remaining === Infinity ? 0 : remaining;
  const durationFormat = duration === Infinity ? 1 : duration;
  return (
    <EffectRow>
      <Bar
        current={remainingFormat || 0}
        max={durationFormat || 1}
        flags={flags}
      />
      <EffectOverlay>
        <EffectDuration>
          {short}
        </EffectDuration>
        <EffectName>
          {name}
        </EffectName>
      </EffectOverlay>
    </EffectRow>
  )
};

const BarContainer = styled.div`
  height: 20px;
  width: 100%;
  padding: 2px 0px;
`;

const EffectRow = styled.div`
  position: relative;
  width: 100%;
  
`;

const EffectOverlay = styled.div`
  color: black;
  font-size: .8em;
  color: ${colors.secondaryText};
  position: absolute;
  display: flex;
  justify-content: flex-start;

  left: 0;
  transform: translateY(-50%);
  top: 50%;
  font-weight: 500;
`;

const GridChild = styled.div`
  /* border-left: solid 2px black; */
  padding: 2px 10px;
`;

const EffectDuration = styled(GridChild)`
  width: 50px;
`;

const EffectName = styled(GridChild)`

  `;

const EffectsContent = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
`;

const EffectsTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  color: ${colors.primaryText}
`;
