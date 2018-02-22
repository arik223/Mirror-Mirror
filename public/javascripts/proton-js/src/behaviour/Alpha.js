import Util from '../utils/Util';
import Behaviour from './Behaviour';

export default class Alpha extends Behaviour {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Alpha
	 *
	 * @todo add description for 'a' and 'b'
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	constructor(a, b, life, easing) {
		super(life, easing);

		this.reset(a, b);
		this.name = "Alpha";
	}

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Alpha
	 * @instance
	 *
	 * @todo add description for 'a' and 'b'
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 */
	reset(a, b, life, easing) {
		this.same = b === null || b === undefined ? true : false;
		this.a = Util.setSpanValue(Util.initValue(a, 1));
		this.b = Util.setSpanValue(b);

		life && super.reset(life, easing);
	}
	
	/**
	 * Sets the new alpha value of the particle
	 *
	 * @method initialize
	 * @memberof Proton#Proton.Alpha
	 * @instance
	 *
	 * @param {Proton.Particle} particle A single Proton generated particle
	 */
	initialize(particle) {
		particle.transform.alphaA = this.a.getValue();

		if (this.same)
			particle.transform.alphaB = particle.transform.alphaA;
		else
			particle.transform.alphaB = this.b.getValue();
	}

	/**
	 * @method applyBehaviour
	 * @memberof Proton#Proton.Alpha
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} 			time the integrate time 1/ms
	 * @param {Int} 			index the particle index
 	 */
	applyBehaviour(particle, time, index) {
		this.calculate(particle, time, index);
		
		particle.alpha = particle.transform.alphaB + (particle.transform.alphaA - particle.transform.alphaB) * this.energy;
		if (particle.alpha < 0.001) particle.alpha = 0;
	}
}
