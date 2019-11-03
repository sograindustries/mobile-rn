import * as React from 'react';
import { View, Animated } from 'react-native';
const { Surface, Shape, Path } = require('@react-native-community/art');
import * as d3 from 'd3';

const data: { ts: number; value: number }[] = [];
for (let i = 0; i < 10; i++) {
  data.push({ ts: i, value: i });
}

const HEART_SHAPE =
  'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z';

const y = d3
  .scaleLinear()
  .domain([0, 10])
  .range([0, 100]);

const x = d3
  .scaleTime()
  .domain([0, 10])
  .range([0, 100]);

const line = d3
  .line<{ ts: number; value: number }>()
  .x(d => x(d.ts))
  .y(d => y(d.value));

const AnimatedShape = Animated.createAnimatedComponent(Shape);

const HeartbeatIcon = () => {
  console.log(line(data));
  const path = new Path()
    .moveTo(0, 0)
    .lineTo(100, 200)
    .lineTo(30, 100);

  console.log(path);

  const size = new Animated.Value(1);

  Animated.loop(
    Animated.timing(size, {
      toValue: 0.9,
      duration: 100
    })
  ).start();

  return (
    <View>
      <Surface width={200} height={200}>
        <AnimatedShape
          d={HEART_SHAPE}
          scale={size}
          originX={400}
          originY={10}
          fill="red"
          visible={true}
          opacity={1.0}
        />
      </Surface>
    </View>
  );
};

export default HeartbeatIcon;
